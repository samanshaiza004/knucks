package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
)

// App struct
type App struct {
	ctx context.Context
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type File struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	IsDirectory bool   `json:"is_directory"`
}

func createFileItem(dirEntry os.DirEntry, dir []string) File {
	return File{
		Name:        dirEntry.Name(),
		IsDirectory: dirEntry.IsDir(),
		Location:    filepath.Join(renderDir(dir), dirEntry.Name()),
	}
}

func renderDir(dirParts []string) string {
	path := filepath.Join(dirParts...)
	absPath, err := filepath.Abs(path)
	check(err)
	return absPath
}

func (a *App) ReturnDir(dirParts []string) string {
	return renderDir(dirParts)
}

func (a *App) ReturnDirItems(dirParts []string) []File {
	entries, err := os.ReadDir(renderDir(dirParts))
	check(err)

	dirItems := make([]File, 0, len(entries))
	for _, entry := range entries {
		dirItems = append(dirItems, createFileItem(entry, dirParts))
	}

	return dirItems
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

func (a *App) ReadFile(path string) ([]byte, error) {
	return ioutil.ReadFile(path)
}

// ServeFile handles serving a file from the local filesystem
func ServeFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == http.MethodOptions {
		return
	}
    http.ServeFile(w, r, r.URL.Path[1:])
}

func (a *App) GetFilePathURL(path string) string {
	absPath, err := filepath.Abs(path)
	check(err)
	return "http://localhost:34115/" + absPath
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

func (a *App) MoveDir(current []string, newDir string) []string {
	index := indexOf(current, newDir)
	if index != -1 {
		current = current[:index+1]
	} else {
		dirItems := a.ReturnDirItems(current)
		if containsDir(dirItems, newDir) {
			current = append(current, newDir)
		} else {
			fmt.Printf("%s isn't a directory\n", newDir)
		}
	}
	return current
}

func containsDir(files []File, dirName string) bool {
	for _, file := range files {
		if file.Name == dirName && file.IsDirectory {
			return true
		}
	}
	return false
}

func indexOf(slice []string, value string) int {
	for i, v := range slice {
		if v == value {
			return i
		}
	}
	return -1
}
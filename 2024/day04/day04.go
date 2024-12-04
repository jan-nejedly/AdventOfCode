package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	data, err := os.ReadFile("day04.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	lines := strings.Split(string(data), "\n")
	grid := make([][]rune, len(lines))
	for i, line := range lines {
		grid[i] = []rune(line)
	}

	countXMAS := countXMAS(grid)
	countXMASPattern := countXMASPattern(grid)

	fmt.Println("Part 1 - Total XMAS:", countXMAS)
	fmt.Println("Part 2 - Total X-MAS:", countXMASPattern)
}

func countXMAS(grid [][]rune) int {
	word := "XMAS"
	count := 0

	for i := range grid {
		for j := range grid[i] {
			if grid[i][j] == 'X' {
				count += bfs(grid, i, j, word)
			}
		}
	}

	return count
}

func bfs(grid [][]rune, x, y int, word string) int {
	count := 0
	directions := [][2]int{
		{0, 1},   // right
		{1, 0},   // down
		{1, 1},   // diagonal down-right
		{1, -1},  // diagonal down-left
		{0, -1},  // left
		{-1, 0},  // up
		{-1, -1}, // diagonal up-left
		{-1, 1},  // diagonal up-right
	}
	for _, dir := range directions {
		if search(grid, x, y, word, dir) {
			count++
		}
	}
	return count
}

func search(grid [][]rune, x, y int, word string, dir [2]int) bool {
	for i := 0; i < len(word); i++ {
		nx, ny := x+dir[0]*i, y+dir[1]*i
		if nx < 0 || ny < 0 || nx >= len(grid) || ny >= len(grid[0]) || grid[nx][ny] != rune(word[i]) {
			return false
		}
	}
	return true
}

func countXMASPattern(grid [][]rune) int {
	count := 0

	for i := range grid {
		for j := range grid[i] {
			if grid[i][j] == 'A' {
				if checkXMASPattern(grid, i, j) {
					count++
				}
			}
		}
	}

	return count
}

func checkXMASPattern(grid [][]rune, x, y int) bool {
	topLeft := getLetter(grid, x-1, y-1)
	bottomRight := getLetter(grid, x+1, y+1)
	topRight := getLetter(grid, x-1, y+1)
	bottomLeft := getLetter(grid, x+1, y-1)

	if topLeft == 'M' && bottomRight == 'S' && topRight == 'M' && bottomLeft == 'S' {
		return true
	}

	if topLeft == 'S' && bottomRight == 'M' && topRight == 'M' && bottomLeft == 'S' {
		return true
	}

	if topLeft == 'M' && bottomRight == 'S' && topRight == 'S' && bottomLeft == 'M' {
		return true
	}

	if topLeft == 'S' && bottomRight == 'M' && topRight == 'S' && bottomLeft == 'M' {
		return true
	}

	return false
}

func getLetter(grid [][]rune, x, y int) rune {
	if x >= 0 && y >= 0 && x < len(grid) && y < len(grid[0]) {
		return grid[x][y]
	}
	return ' '
}

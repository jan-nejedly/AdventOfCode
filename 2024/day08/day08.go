package main

import (
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	grid := readGrid()
	antinodes := findAntinodes(grid)
	correctedAntinodes := findCorrectedAntinodes(grid)
	fmt.Printf("Part 1 - Total antinodes: %d\n", len(antinodes))
	fmt.Printf("Part 2 - Total corrected antinodes: %d\n", len(correctedAntinodes))
}

func readGrid() [][]rune {
	data, err := os.ReadFile("day08.txt")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	lines := strings.Split(string(data), "\n")
	grid := make([][]rune, len(lines))
	for i, line := range lines {
		grid[i] = []rune(line)
	}

	return grid
}

func getAntennaPositions(grid [][]rune) map[rune][][2]int {
	antennaPositions := make(map[rune][][2]int)
	for y, row := range grid {
		for x, char := range row {
			if char != '.' {
				antennaPositions[char] = append(antennaPositions[char], [2]int{x, y})
			}
		}
	}
	return antennaPositions
}

func findAntinodes(grid [][]rune) map[[2]int]struct{} {
	antinodes := make(map[[2]int]struct{})
	antennaPositions := getAntennaPositions(grid)

	for _, positions := range antennaPositions {
		for i := 0; i < len(positions); i++ {
			for j := i + 1; j < len(positions); j++ {
				x1, y1 := positions[i][0], positions[i][1]
				x2, y2 := positions[j][0], positions[j][1]
				var firstAntinode = [2]int{0, 0}
				var secondAntinode = [2]int{0, 0}

				if x1 > x2 {
					firstAntinode[0] = x1 + (x1 - x2)
					secondAntinode[0] = x2 - (x1 - x2)
				} else {
					firstAntinode[0] = x1 - (x2 - x1)
					secondAntinode[0] = x2 + (x2 - x1)
				}

				if y1 > y2 {
					firstAntinode[1] = y1 + (y1 - y2)
					secondAntinode[1] = y2 - (y1 - y2)
				} else {
					firstAntinode[1] = y1 - (y2 - y1)
					secondAntinode[1] = y2 + (y2 - y1)
				}

				if firstAntinode[0] >= 0 && firstAntinode[0] < len(grid[0]) && firstAntinode[1] >= 0 && firstAntinode[1] < len(grid) {
					antinodes[firstAntinode] = struct{}{}
				}

				if secondAntinode[0] >= 0 && secondAntinode[0] < len(grid[0]) && secondAntinode[1] >= 0 && secondAntinode[1] < len(grid) {
					antinodes[secondAntinode] = struct{}{}
				}

			}
		}
	}

	return antinodes
}

func findCorrectedAntinodes(grid [][]rune) map[[2]int]struct{} {
	antinodes := make(map[[2]int]struct{})
	antennaPositions := getAntennaPositions(grid)

	for _, positions := range antennaPositions {
		for i := 0; i < len(positions); i++ {
			for j := i + 1; j < len(positions); j++ {
				x1, y1 := positions[i][0], positions[i][1]
				x2, y2 := positions[j][0], positions[j][1]

				for k := 1; ; k++ {
					antinodesAdded := false

					var newX int
					var newY int

					if x1 > x2 {
						newX = x1 + k*(x1-x2)
					} else {
						newX = x1 - k*(x2-x1)
					}

					if y1 > y2 {
						newY = y1 + k*(y1-y2)
					} else {
						newY = y1 - k*(y2-y1)
					}

					if newX >= 0 && newX < len(grid[0]) && newY >= 0 && newY < len(grid) {
						antinodes[[2]int{newY, newX}] = struct{}{}
						antinodesAdded = true
					}

					if x1 > x2 {
						newX = x2 - k*(x1-x2)
					} else {
						newX = x2 + k*(x2-x1)
					}

					if y1 > y2 {
						newY = y2 - k*(y1-y2)
					} else {
						newY = y2 + k*(y2-y1)
					}

					if newX >= 0 && newX < len(grid[0]) && newY >= 0 && newY < len(grid) {
						antinodes[[2]int{newY, newX}] = struct{}{}
						antinodesAdded = true
					}

					if !antinodesAdded {
						for antennas := range antennaPositions {
							for _, pos := range antennaPositions[antennas] {
								antinodes[[2]int{pos[1], pos[0]}] = struct{}{}
							}
						}
						break
					}
				}
			}
		}
	}

	return antinodes
}

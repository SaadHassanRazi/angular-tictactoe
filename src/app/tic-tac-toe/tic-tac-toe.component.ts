import { isNgTemplate } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
})
export class TicTacToeComponent {
  squares: (string | null)[] = Array(9).fill(null);
  xIsNext: boolean = true;
  winner: string | null = null;

  //Status of game {winner,loser}
  get status(): string {
    if (this.winner) {
      return `Winner: ${this.winner}`;
    } else if (!this.squares.includes(null)) {
      return 'Draw!';
    } else {
      return `Next player: ${this.xIsNext ? 'X' : 'O'}`;
    }
  }

  //Whenever user make moves its calculate whether the game ends or not
  makeMove(index: number): void {
    if (!this.squares[index]) {
      this.squares[index] = !this.xIsNext ? 'X' : 'O';
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
  }

  //Calculating winner on every attempt
  calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Columns
      [0, 4, 8],
      [2, 4, 6],
      // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  //Reset Game
  resetGame(): void {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
  }
}

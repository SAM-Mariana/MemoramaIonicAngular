import { Component, OnInit } from '@angular/core';

interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.page.html',
  styleUrls: ['./memorama.page.scss'],
})
export class MemoramaPage {
  grid: Card[][] = [];

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    const values = ['🪷', '🪷', '🌸', '🌸', '🌷', '🌷', '🌺', '🌺'];
    values.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 2; j++) {
        const cardValue = values.pop();
        if (cardValue) {
          this.grid[i][j] = { value: cardValue, flipped: false, matched: false };
        }
      }
    }
  }

  flipCard(card: Card) {
    if (!card.flipped) {
      card.flipped = true;
      const flippedCards: Card[] = [];
      this.grid.forEach(row => {
        row.forEach(c => {
          if (c.flipped && !c.matched) {
            flippedCards.push(c);
          }
        });
      });
      if (flippedCards.length === 2) {
        setTimeout(() => this.checkMatch(), 1000);
      }
    }
  }

  checkMatch() {
    const flippedCards: Card[] = [];
    this.grid.forEach(row => {
      row.forEach(c => {
        if (c.flipped && !c.matched) {
          flippedCards.push(c);
        }
      });
    });
    if (flippedCards[0].value === flippedCards[1].value) {
      flippedCards.forEach(card => card.matched = true);
    } else {
      flippedCards.forEach(card => card.flipped = false);
    }
  }
}

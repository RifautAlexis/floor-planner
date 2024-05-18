import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application, Assets, Sprite } from 'pixi.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  app = new Application();

  async ngOnInit(): Promise<void> {
    await this.app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(this.app.canvas);

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const bunny = new Sprite(texture);

    this.app.stage.addChild(bunny);

    bunny.anchor.set(0.5)

    bunny.x = this.app.screen.width / 2
    bunny.y = this.app.screen.height / 2

    this.app.ticker.add((time) => {
      bunny.rotation += 0.1 * time.deltaTime;
    });
  }
}

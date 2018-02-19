import { Routes } from "@angular/router";
import { StartScreenComponent } from "./components/start-screen/start-screen.component";
import { GameComponent } from "./components/game/game.component";



export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start-screen' },

  { path: 'start-screen', component: StartScreenComponent },

  { path: 'game', component: GameComponent }
  // {path: '**', component: NotFoundComponent}
]

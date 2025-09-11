import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './task-list/task-list';
import { FormParamExtraccionCandidatosComponent } from './parametrizacion-extraccion-candidatos/parametrizacion-extraccion-candidatos';
// Agrega otros imports...

@NgModule({
  declarations: [ ],
  imports: [BrowserModule, GraphQLModule, HttpClientModule],
  providers: [],
  bootstrap: []
})
export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ ],
  imports: [BrowserModule, GraphQLModule, HttpClientModule ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
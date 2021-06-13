import { Component, OnInit } from '@angular/core';
import {Apollo, gql, QueryRef} from "apollo-angular";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { v4 } from 'uuid';


const GET_MENUS = gql`
  query getMenu {
    menu {
      id
      name
      food_items {
        name
        price
      }
    }
  }
`;

const addFoodItem = gql`
  mutation addNewFoodItem($id: uuid!, $image_url: String, $menu_id: uuid!, $name: String!, $price: numeric!) {
    insert_food_items(objects: {name: $name, price: $price, menu_id: $menu_id, image_url: $image_url, id: $id}) {
      affected_rows
    }
  }
`



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  menus?: Observable<{ id:string, name:string, food_items: { name: string, price: number }[] }[]>;
  fg?: FormGroup;
  currentMenuId?: string;
  getMenuQuery?: QueryRef<any>;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMenuQuery = this.apollo.watchQuery({
      query: GET_MENUS,
      pollInterval: 5000
    });

    this.menus = this.getMenuQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.menu;
      }),
      tap(console.log)
    );

    this.fg = this.fb.group({
      name: ['', Validators.required],
      price: [, Validators.required]
    });
  }

  saveItem() {
    if (this.fg?.valid) {
      this.apollo.mutate({
        mutation: addFoodItem,
        variables: {
          id: v4(),
          image_url: null,
          menu_id: this.currentMenuId,
          name: this.fg?.value.name,
          price: this.fg?.value.price
        }
      }).subscribe(()=> {
        console.log('done!');
        this.getMenuQuery?.refetch();
      }, (err)=> {
        console.log('failed!', err);
      })
    } else {
      this.fg?.markAllAsTouched();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CsvConversionService } from './services/csv-conversion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
 
  constructor(
    private csvService: CsvConversionService,
    ) 
    {}
  
  mainQuestion="Guida all aquisto"
  secondQuestion="cosa stavi cercando?"
  title = 'product-guide';
  suggestedProducts=[{},{},{},{},{}]
  products: any[]=[]
  complete_categories_json:any={}

  ngOnInit(): void {
    console.log("kllkj")
    const csvContent = `name,age,city
    John,25,New York
    Jane,30,San Francisco`;

    let catalog=this.csvService.getMagentoCatalog().then((csv_text)=>{
      this.csvService.convertCsvToJson(csv_text).then((res)=>{
        console.log(res)
        this.extract_categories(res)
      })
    })
  }
  extract_categories(json_catalog:any[]):any{
    json_catalog.forEach((product:any)=>{
      if(product.category != undefined){
        let categories_from_product=product.category.split("/")
        let current_obj=this.complete_categories_json
        for(let i=0;i<categories_from_product.length;i++){
          if(!current_obj[categories_from_product[i]]){
            current_obj[categories_from_product[i]]={}
            current_obj=current_obj[categories_from_product[i]]
          }else{
            current_obj=current_obj[categories_from_product[i]]
          }
        }
      }
      
    })
    console.log(this.complete_categories_json)

  }




}

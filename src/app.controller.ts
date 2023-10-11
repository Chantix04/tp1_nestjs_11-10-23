import { Controller, Get, Param, Post, Delete, Patch, Body } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  private products = [
    {
      id:1,
      name:'chanti',
      description:'Descripcion del producto 1'
    },
    {
      id:2,
      name:'chanti2',
      description:'Descripcion del producto 2'
    },
    {
      id:3,
      name:'chanti3',
      description:'Descripcion del producto 3'
    },
  ]
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.products;
  }
  
  @Get(':id') 
  getProduct(@Param('id') id:number):any {
    return this.products.find( product => product.id === +id)
  }

  @Post()
  sendData(@Body() datos) :any {
    return datos;
  }

  @Patch(':id')
  patchData(@Param('id') id:number, @Body() datos) :any { // como el patchData es una función, podemos pasarle más de un parámetro así que le ponemos el param y el body
   return this.products.map(product => { // mapeamos el id del producto y si lo encuentra, lo actualiza. Si no, retorna la lista de productos.
    if(product.id === +id){
      return product = {...product, ...datos}
    }
    return product
   })
  }
  @Delete(':id')
  deleteData(@Param('id') id:number):any { // tomamos el id del producto por parámetros para poder removerlo de la lista
    this.products = this.products.filter(product => product.id !== +id) // para borrar el producto, utilizamos un filter para quitarlo y actualizamos la lista
    return this.products // retornamos la lista actualizada.
  }
}

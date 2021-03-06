import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.models';
import { ProductoService } from '../../services/producto.service';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ],
})
export class ProductosComponent implements OnInit {
faEdit = faEdit;
faTrash = faTrash;
faPlus = faPlus;
productos: Producto[] = [];
desde = 0;
totalRegistros = 0;
cargando = true;

  constructor(
    public _productoService : ProductoService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this._productoService.cargarProductos()
              .subscribe( (resp: any) => {
                console.log(resp.productos);
                this.totalRegistros = resp.total;
                this.productos = resp.productos;
                this.cargando = false;
              });
  }

  borrarProducto (producto: Producto) {
    console.log(producto);

    Swal.fire({
      title: ' Esta seguro?',
      text: ' Esta a punto de borrar a ' + producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6'
    })
    .then(borrar => {

      if ( borrar.value){

        this._productoService.borrarProducto(producto._id)
                .subscribe(borrado  => {
                  console.log(borrado);
                  this.cargarProductos();
                });

      }
    });

  }

  

  guardarProducto (producto: Producto){
    this._productoService.actualizarProducto(producto)
            .subscribe();
            console.log(producto);
  }

  buscarProducto(termino:string){

    if(termino.length<=0){
      this.cargarProductos();
      return;
    }
    this.cargando = true;
    this._productoService.buscarProductos(termino)
            .subscribe((productos : Producto [])=>{
              this.productos = productos;
              this.cargando = false;
            });
  }
}

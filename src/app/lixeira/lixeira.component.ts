import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import * as XLSX from 'ts-xlsx';
import { Produto } from '../cadastro-prod/produtos/produto.model';
import { ProdutosService } from '../cadastro-prod/produtos/produtos.service';

@Component({
    selector: 'lixeira',
    templateUrl: './lixeira.component.html'
})
export class LixeiraComponent implements OnInit{

    produtos: Produto[];
    listProdutos: Produto[];
    produtosExecel: Produto[];
    produto: Produto = new Produto();
    loading = false;
    arrayBuffer:any;
    file:File;
    totalListaExcel: number;
    mostrarLista:boolean = false;
    fileUpload: any;

    cores = ['#f96332', '#f96332', '#dc3545', '#007bff','#212529', '#17a2b8', '#28a745', '#2ca8ff', '#872cff'];
    filtro: string = '';

    constructor(private service: ProdutosService) {
        this.loading = true;
    }

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }

    filter(filtro){

        let itemTeste = this.produtos.filter(function(item){
            return item.nome == filtro;
        });

        if(itemTeste.length > 0){
            this.produtos = itemTeste;
            console.log(itemTeste);
        } else {
            this.produtos = this.listProdutos;
        }      
    }

    preencheFormModal(textJson){
        let json = JSON.parse(textJson);
        this.produto.nome = json.nome;
        this.produto.marca = json.marca;
        this.produto.descricao = json.descricao;
        this.produto.preco = json.preco;
    }

    excluirProduto(){
        //link https://stackoverflow.com/questions/38677664/how-to-use-sweetalert2-in-angular2
        swal({
            type:'warning',
            title: 'Are you sure to Delete Staff?',
            text: 'You will not be able to recover the data of Staff',
            showCancelButton: true,
            confirmButtonColor: '#049F0C',
            cancelButtonColor:'#ff0000',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(() => {
        //   this.dataService.deleteStaff(staffId).subscribe(
        //     data => {
        //       if (data.hasOwnProperty('error')) {
        //         this.alertService.error(data.error);
        //       } else if (data.status) {
                swal({
                  type:'success',
                  title: 'Deleted!',
                  text: 'The Staff has been deleted.',              
                })
              //}
            }, error => {
              //this.alertService.error(error);
            });

            // if (dismiss === 'cancel') {
            //     swal({
            //       type:'info',
            //       title: 'Cancelled',
            //       text: 'Your Staff file is safe :)'
            //     })
            //   }
         
    }

    salvarAlterarProduto(){
          swal({
            title: 'Salvo!',
            text: 'Produto salvo com sucesso!',
            type: 'success',
            confirmButtonText: 'Ok'
          })
    }
    limparLista(){
        //this.produtosExecel = [];
        this.mostrarLista = false;
        this.fileUpload = null;
    }
    public uploadData(event: any) : void { 
        // get data from file upload       
        let reader, filesData = event.target.files;
        this.file = filesData[0];
        console.log(this.file);
        


        if (this.file) {
            //https://stackoverflow.com/questions/47151035/angular-4-how-to-read-data-from-excel
            reader = new FileReader();
            // reader.onload = function (e) {
            //     console.log(e.xlsx.FlexGridXlsxConverter.load(event.files[0],
            //         { includeColumnHeaders: true }));
                
            // };

            reader.onload = (e) => {
                this.arrayBuffer = reader.result;
                var data = new Uint8Array(this.arrayBuffer);
                var arr = new Array();
                for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = XLSX.read(bstr, {type:"binary"});
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                this.produtosExecel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
                this.produtosExecel.map(x => {
                    x.cor =  this.cores[Math.floor(Math.random() * this.cores.length)];
                });
                this.totalListaExcel = this.produtosExecel.length;
                this.mostrarLista = true;

                console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            }
            reader.readAsArrayBuffer(this.file);
        }
    }


}
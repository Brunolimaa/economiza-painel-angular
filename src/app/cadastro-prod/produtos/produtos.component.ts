import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';
import swal from 'sweetalert2';
import * as XLSX from 'ts-xlsx';
import { StorageService } from '../../services/storage.service';
import { PrecosService } from './precos.service';
import { Preco } from '../../model/preco.model';
import { Loja } from '../../model/loja.model';

@Component({
    selector: 'produtos',
    templateUrl: './produtos.component.html'
})
export class ProdutosComponent implements OnInit{
   
    produtos: Produto[];
    listProdutos: Produto[];
    produto: Produto = new Produto();
    precos: Preco = new Preco();
    loading = false;
    arrayBuffer:any;
    file:File;
    loja: Loja;

    cores = ['#f96332', '#f96332', '#dc3545', '#007bff','#212529', '#17a2b8', '#28a745', '#2ca8ff', '#872cff'];
    filtro: string = '';

    constructor(private service: ProdutosService, private servicePreco: PrecosService, private storage: StorageService) {
        this.loading = true;
        this.buscarListaProduto();
    }

    ngOnInit(): void {
        console.log(this.storage.getLocalUser());
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
        this.precos.produto.id = json.id;
        this.precos.produto.nome = json.nome;
        this.precos.produto.marca = json.marca;
        this.precos.produto.descricao = json.descricao;
        this.precos.produto.preco = json.preco;
    }

    excluirProduto(id){
        //link https://stackoverflow.com/questions/38677664/how-to-use-sweetalert2-in-angular2
        swal({
            type:'warning',
            title: 'Excluir?',
            text: 'Voce tem certeza que deseja excluir o registro?',
            showCancelButton: true,
            confirmButtonColor: '#049F0C',
            cancelButtonColor:'#ff0000',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Nao, excluir'
          }).then(() => {
                this.service.removeProduto(id).subscribe(res =>{
                    this.service.getProdutos(id);
                    swal({
                        type:'success',
                        title: 'Deleted!',
                        text: 'The Staff has been deleted.',              
                      })
                      this.buscarListaProduto();
                });

            }, error => {
              //this.alertService.error(error);
            });         
    }

    alterarProduto(){

        this.precos.loja.id = this.storage.getLocalUser().jti;
        
        console.log(this.precos);
         this.servicePreco.atualizarProdutos("precos",this.precos.produto.id, this.precos)
        .subscribe(res => {
            swal({
                title: 'Salvo!',
                text: 'Produto atualizado com sucesso!',
                type: 'success',
                confirmButtonText: 'Ok'
              })
              this.service.getProdutos(this.storage.getLocalUser().jti).subscribe(res => {
                this.produtos = res;
                this.listProdutos = res;
                this.loading = false;
               this.produtos.map(x => {
                   x.cor =  this.cores[Math.floor(Math.random() * this.cores.length)];
               });
               console.log(this.listProdutos);

            })
            
        })

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
                console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            }
            reader.readAsArrayBuffer(this.file);
        }
    }

    cadastrar(){
        this.precos.loja.id = this.storage.getLocalUser().jti;
        
        console.log(this.precos);
        this.servicePreco.cadastrarProdutos("precos", this.precos)
        .subscribe(res => {
            swal({
                title: 'Salvo!',
                text: 'Produto salvo com sucesso!',
                type: 'success',
                confirmButtonText: 'Ok'
              })
              this.service.getProdutos(this.storage.getLocalUser().jti).subscribe(res => {
                this.produtos = res;
                this.listProdutos = res;
                this.loading = false;
               this.produtos.map(x => {
                   x.cor =  this.cores[Math.floor(Math.random() * this.cores.length)];
               });
               console.log(this.listProdutos);

            })
            
        })
    }

    buscarListaProduto(){
        this.service.getProdutos(this.storage.getLocalUser().jti).subscribe(res => {
            this.produtos = res;
            this.listProdutos = res;
            this.loading = false;
           this.produtos.map(x => {
               x.cor =  this.cores[Math.floor(Math.random() * this.cores.length)];
           });
        })
    }
  
}
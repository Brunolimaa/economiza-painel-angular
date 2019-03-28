import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Precos } from './precos.modelo';

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit{

    tasks = [];
    task = "";
    isAdmin:boolean = true;
    precos: Precos[];

    constructor(private service: TaskService){

    }
    
    ngOnInit(): void {
        this.service.gePrecos().subscribe(res => {
            console.log(res);
        })
    }

    add():void{
        this.tasks.push(this.task);
    }


}
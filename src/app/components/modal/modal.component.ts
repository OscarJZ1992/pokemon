import { POKEMON_DATA } from 'src/app/models/pokemon';
import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-modal',
  template: '',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {

  closeResult = '';

  @Input()
	pokemonDetail!: TemplateRef<any>;
	
	@Input("openModal") set openModal(show: boolean){
		if(show){
			this.open(this.pokemonDetail)
		}else{
			this.modalService.dismissAll()
		}
	}

	@Output() closeModal = new EventEmitter<any>();

	constructor(private modalService: NgbModal) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'pokemonDetail' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
				this.closeModal.emit(false)
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				this.closeModal.emit(false)
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}


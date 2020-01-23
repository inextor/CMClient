import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

	constructor(public rest:RestService) { }

	@Input() width:number	= 150;
	@Input() height: number = 150;
	@Input() image:number = 1;
	@Output() imageChange= new EventEmitter<number>();

	ngOnInit() {

  }
  
	uploadImage(evt)
	{
		if (evt.target.files.length)
		{
			this.rest.uploadImage(evt.target.files[0], false).subscribe((imageData) => {
				this.image = imageData.id;
				this.imageChange.emit( imageData.id );
			}, error => this.rest.showError(error));
		}
	}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() SearchText: string = '';

  @Output() SearchTextChange: EventEmitter<string> = new EventEmitter<string>();

  onSearch() { this.SearchTextChange.emit(this.SearchText); }

}

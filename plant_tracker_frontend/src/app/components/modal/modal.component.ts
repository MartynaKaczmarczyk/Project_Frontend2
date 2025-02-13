import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() public confirmAction = new EventEmitter<void>();
  @Output() public cancelAction = new EventEmitter<void>();

  public onConfirm(): void {
    this.confirmAction.emit();
  }

  public onCancel(): void {
    this.cancelAction.emit();
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingPage } from './editing.page';

describe('EditingPage', () => {
  let component: EditingPage;
  let fixture: ComponentFixture<EditingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

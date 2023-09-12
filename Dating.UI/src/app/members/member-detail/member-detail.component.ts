import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  template: `<gallery [items]="images"></gallery>`
})
export class MemberDetailComponent implements OnInit{
  member!: Member;
  images!: GalleryItem[];
  constructor(private memberService: MembersService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')!).subscribe({
      next:(response) => {
        this.member = response;
        setTimeout(() => {
          this.images = response.photos.map(item => new ImageItem({src: item?.url,thumb: item?.url}));
        }, 2000);
        // if(response.photos != null){
        //   this.images = response.photos.map(item => new ImageItem({src: item?.url,thumb: item?.url}));
        // }
      }
    })
  }
  // loadImages(): GalleryItem[] {
  //   const imageUrls = [];
  //   for (const photo of this.member.photos) {
  //     imageUrls.push(
  //       new ImageItem({
  //         src: photo?.url,
  //         thumb: photo?.url
  //       })
  //     );
  //   }
  //   return imageUrls;
  // }
}

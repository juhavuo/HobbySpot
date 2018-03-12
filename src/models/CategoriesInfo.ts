import {Mediafile} from "./Mediafile";

export class CategoriesInfo{
  category_tag:string;
  files?: [{
    file_id: number;
    tags_attached?: string[];
  }]
}

import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { TimeFormatterPipe } from './time-formatter/time-formatter';
@NgModule({
	declarations: [ThumbnailPipe,
    TimeFormatterPipe],
	imports: [],
	exports: [ThumbnailPipe,
    TimeFormatterPipe]
})
export class PipesModule {}

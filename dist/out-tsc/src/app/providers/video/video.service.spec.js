import { TestBed } from '@angular/core/testing';
import { VideoService } from './video.service';
describe('VideoService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(VideoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=video.service.spec.js.map
import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../../src/patients/patients.controller';
import { PatientsService } from '../../src/patients/patients.service';

describe('PatientsController', () => {
    let controller: PatientsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientsController],
            providers: [PatientsService]
        }).compile();

        controller = module.get<PatientsController>(PatientsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

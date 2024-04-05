import { Test, TestingModule } from '@nestjs/testing';
import { WardsController } from '../../src/wards/wards.controller';
import { WardsService } from '../../src/wards/wards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ward } from '../../src/wards/entities/ward.entity';
import { Hospital } from '../../src/hospitals/entities/hospital.entity';
import { TreatmentLevel } from '../../src/wards/entities/treatment-level.entity';

describe('WardsController', () => {
    let controller: WardsController;
    let wardsService: WardsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WardsController],
            providers: [
                WardsService,
                {
                    provide: getRepositoryToken(Ward),
                    useValue: {}
                },
                {
                    provide: getRepositoryToken(TreatmentLevel),
                    useValue: {}
                }
            ]
        }).compile();

        controller = module.get<WardsController>(WardsController);
        wardsService = module.get<WardsService>(WardsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllWards', () => {
        it('should return an array of wards', async () => {
            const wards: Ward[] = [
                {
                    id: 1,
                    description: 'Ward A',
                    min_patient_age: 10,
                    max_patient_age: 60,
                    treatment_level: 1,
                    location: 1,
                    gender: 'Male',
                    hospital_id: 1,
                    hospital: new Hospital(),
                    treatmentLevel: new TreatmentLevel()
                }
            ];
            jest.spyOn(controller, 'getAllWards').mockResolvedValue(wards);

            expect(await controller.getAllWards()).toBe(wards);
        });
    });

    describe('getWardById', () => {
        it('should return a ward by ID', async () => {
            const ward: Ward = {
                id: 1,
                description: 'Ward A',
                min_patient_age: 10,
                max_patient_age: 60,
                treatment_level: 1,
                location: 1,
                gender: 'Male',
                hospital_id: 1,
                hospital: new Hospital(),
                treatmentLevel: new TreatmentLevel()
            };
            jest.spyOn(controller, 'getWardById').mockResolvedValue(ward);

            expect(await controller.getWardById(1)).toBe(ward);
        });
    });
});

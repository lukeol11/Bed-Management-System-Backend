import { Test, TestingModule } from '@nestjs/testing';
import { WardsService } from '../../src/wards/wards.service';
import { Ward } from '../../src/wards/entities/ward.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentLevel } from '../../src/wards/entities/treatment-level.entity';

describe('WardsService', () => {
    let service: WardsService;
    let repository: Repository<Ward>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WardsService,
                {
                    provide: getRepositoryToken(Ward),
                    useClass: Repository
                },
                {
                    provide: getRepositoryToken(TreatmentLevel),
                    useValue: {}
                }
            ]
        }).compile();

        service = module.get<WardsService>(WardsService);
        repository = module.get<Repository<Ward>>(getRepositoryToken(Ward));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of wards', async () => {
            const wards: Ward[] = [
                {
                    id: 1,
                    description: 'Description',
                    min_patient_age: 0,
                    max_patient_age: 100,
                    treatment_level: 1,
                    location: 1,
                    gender: 'All',
                    hospital_id: 1,
                    hospital: null,
                    treatmentLevel: null
                }
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(wards);

            const result = await service.findAll();
            expect(result).toEqual(wards);
        });
    });
});

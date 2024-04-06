import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../../src/patients/patients.service';
import { Patient } from '../../src/patients/entities/patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PatientsService', () => {
    let service: PatientsService;
    let repository: Repository<Patient>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PatientsService,
                {
                    provide: getRepositoryToken(Patient),
                    useClass: Repository
                }
            ]
        }).compile();

        service = module.get<PatientsService>(PatientsService);
        repository = module.get<Repository<Patient>>(
            getRepositoryToken(Patient)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of patients', async () => {
            const patients: Patient[] = [
                {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    date_of_birth: '1990-01-01',
                    in_transit: false,
                    gender: 'Male',
                    created_by: 1,
                    created_at: new Date(),
                    treatment_level_id: 1
                }
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(patients);

            const result = await service.findAll();
            expect(result).toEqual(patients);
        });
    });

    describe('deletePatient', () => {
        it('should delete a patient', async () => {
            const id = 1;
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            const result = await service.deletePatient(id);
            expect(result).toEqual('Patient deleted');
        });
    });

    describe('updatePatient', () => {
        it('should update a patient', async () => {
            const id = 1;
            const patient: Patient = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                in_transit: false,
                gender: 'Male',
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 1
            };
            jest.spyOn(repository, 'update').mockResolvedValue(undefined);
            jest.spyOn(service, 'findPatientById').mockResolvedValue(patient);

            const result = await service.updatePatient(id, patient);
            expect(result).toEqual(patient);
        });
    });

    describe('findPatientById', () => {
        it('should find a patient by ID', async () => {
            const id = 1;
            const patient: Patient = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                in_transit: false,
                gender: 'Male',
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 1
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(patient);

            const result = await service.findPatientById(id);
            expect(result).toEqual(patient);
        });
    });

    describe('createPatient', () => {
        it('should create a new patient', async () => {
            const newPatient: Patient = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                in_transit: false,
                gender: 'Male',
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 1
            };
            const createdPatient: Patient = {
                id: 1,
                ...newPatient
            };
            jest.spyOn(repository, 'save').mockResolvedValue(createdPatient);

            const result = await service.createPatient(newPatient);
            expect(result).toEqual(createdPatient);
        });
    });
});

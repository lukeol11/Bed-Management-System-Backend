import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from '../../src/patients/patients.controller';
import { PatientsService } from '../../src/patients/patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../../src/patients/entities/patient.entity';

describe('PatientsController', () => {
    let controller: PatientsController;
    let patientsService: PatientsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PatientsController],
            providers: [
                PatientsService,
                {
                    provide: getRepositoryToken(Patient),
                    useValue: {}
                }
            ]
        }).compile();

        controller = module.get<PatientsController>(PatientsController);
        patientsService = module.get<PatientsService>(PatientsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllPatients', () => {
        it('should return an array of patients', async () => {
            const patients: Patient[] = [
                {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    date_of_birth: '1990-01-01',
                    in_transit: false,
                    created_by: 1,
                    created_at: new Date(),
                    treatment_level_id: 1
                }
            ];
            jest.spyOn(patientsService, 'findAll').mockResolvedValue(patients);

            expect(await controller.getAllPatients()).toBe(patients);
        });
    });

    describe('getPatientById', () => {
        it('should return a patient by ID', async () => {
            const patient: Patient = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                in_transit: false,
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 1
            };
            jest.spyOn(patientsService, 'findPatientById').mockResolvedValue(
                patient
            );

            expect(await controller.getPatientById(1)).toBe(patient);
        });
    });

    describe('deletePatient', () => {
        it('should delete a patient by ID', async () => {
            jest.spyOn(patientsService, 'deletePatient').mockResolvedValue(
                'Patient deleted'
            );

            expect(await controller.deletePatient(1)).toBe('Patient deleted');
        });
    });

    describe('updateWard', () => {
        it('should update patient properties by ID', async () => {
            const updatedPatient: Patient = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                date_of_birth: '1990-01-01',
                in_transit: false,
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 2
            };
            jest.spyOn(patientsService, 'updatePatient').mockResolvedValue(
                updatedPatient
            );

            expect(await controller.updateWard(1, updatedPatient)).toBe(
                updatedPatient
            );
        });
    });

    describe('createPatient', () => {
        it('should create a new patient', async () => {
            const newPatient: Patient = {
                id: 2,
                first_name: 'Jane',
                last_name: 'Doe',
                date_of_birth: '1995-01-01',
                in_transit: false,
                created_by: 1,
                created_at: new Date(),
                treatment_level_id: 1
            };
            jest.spyOn(patientsService, 'createPatient').mockResolvedValue(
                newPatient
            );

            expect(await controller.createPatient(newPatient)).toBe(newPatient);
        });
    });
});

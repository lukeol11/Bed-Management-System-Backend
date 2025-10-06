INSERT INTO
    bms.hospitals (description, location)
VALUES
    (
        'University Hospital Limerick',
        'St Nessan''s Road, Dooradoyle, Limerick, V94 F858'
    ),
    (
        'University Maternity Hospital Limerick',
        'Ennis Road, Limerick City, Limerick, V94 C566'
    ),
    (
        'St. John''s Hospital Limerick',
        'St John''s Square, Limerick City, Limerick, V94 H272'
    );

INSERT INTO bms.users
(first_name, last_name, hospital_id, email, phone_number, created_by, created_at, roles)
VALUES('Demo', 'Account', 1, 'test@test.com', '123456789', 1, '2025-06-13 08:04:02', 'user');

INSERT INTO
    bms.disabled_reasons (reason)
VALUES
    ('Cleaning Required'),
    ('Occupied'),
    ('Checkout Scheduled'),
    ('Out of Order');

INSERT INTO
    bms.treatment_levels (name, description, equipment)
VALUES
    ('Default', 'Default treatment', 'Standard');
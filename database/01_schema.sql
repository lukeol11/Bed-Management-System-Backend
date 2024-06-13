CREATE DATABASE IF NOT EXISTS `bms`;

USE `bms`;

CREATE TABLE
    `bed_occupancy` (
        `id` int NOT NULL AUTO_INCREMENT,
        `patient_id` int NOT NULL,
        `bed_id` int NOT NULL,
        `created_by` int NOT NULL,
        `time_booked` datetime NOT NULL,
        `checkout_time` datetime DEFAULT NULL,
        `created_at` datetime NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `beds` (
        `id` int NOT NULL AUTO_INCREMENT,
        `description` varchar(255) NOT NULL,
        `ward_id` int NOT NULL,
        `disabled` tinyint NOT NULL,
        `disabled_reason_id` int DEFAULT NULL,
        `updated_at` datetime NOT NULL,
        `created_at` datetime NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `booking_requests` (
        `id` int NOT NULL AUTO_INCREMENT,
        `notes` varchar(255) DEFAULT NULL,
        `bed_approved` int DEFAULT NULL,
        `created_by` int NOT NULL,
        `approved_by` int DEFAULT NULL,
        `bed_requested` int NOT NULL,
        `hospital_id` int NOT NULL,
        `created_at` datetime NOT NULL,
        `approved_at` datetime DEFAULT NULL,
        `patient_id` int NOT NULL,
        `current_bed` int NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `disabled_reasons` (
        `id` int NOT NULL AUTO_INCREMENT,
        `reason` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `hospitals` (
        `id` int NOT NULL AUTO_INCREMENT,
        `description` varchar(255) NOT NULL,
        `location` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `patients` (
        `id` int NOT NULL AUTO_INCREMENT,
        `first_name` varchar(255) NOT NULL,
        `last_name` varchar(255) NOT NULL,
        `in_transit` tinyint NOT NULL,
        `created_by` int NOT NULL,
        `treatment_level_id` int NOT NULL,
        `date_of_birth` varchar(255) NOT NULL,
        `created_at` datetime (6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        `gender` enum ('Male', 'Female', 'Other') NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `treatment_levels` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `description` varchar(255) NOT NULL,
        `equipment` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `users` (
        `id` int NOT NULL AUTO_INCREMENT,
        `first_name` varchar(255) NOT NULL,
        `last_name` varchar(255) NOT NULL,
        `can_approve_requests` tinyint NOT NULL,
        `hospital_id` int NOT NULL,
        `email` varchar(255) NOT NULL,
        `phone_number` varchar(255) NOT NULL,
        `created_by` int NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `can_administrate` tinyint NOT NULL,
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    `wards` (
        `id` int NOT NULL AUTO_INCREMENT,
        `description` varchar(255) NOT NULL,
        `min_patient_age` int NOT NULL,
        `max_patient_age` int NOT NULL,
        `treatment_level` int NOT NULL,
        `location` int NOT NULL,
        `gender` enum ('Male', 'Female', 'All') NOT NULL,
        `hospital_id` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `FK_a3893f2fca33f9b0b39aae1848e` (`hospital_id`),
        KEY `FK_a39c6a05021db14dd1be6b36dd5` (`treatment_level`),
        CONSTRAINT `FK_a3893f2fca33f9b0b39aae1848e` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`),
        CONSTRAINT `FK_a39c6a05021db14dd1be6b36dd5` FOREIGN KEY (`treatment_level`) REFERENCES `treatment_levels` (`id`)
    );
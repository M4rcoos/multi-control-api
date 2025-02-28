-- CreateTable
CREATE TABLE `tb_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `password` VARCHAR(40) NULL,
    `user_type_id` INTEGER NOT NULL DEFAULT 1,
    `cell_phone` VARCHAR(13) NULL,
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_tb_user_type_tb_idx`(`user_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

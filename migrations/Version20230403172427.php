<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230403172427 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE friend (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, INDEX IDX_55EEAC61A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE friend_request (id INT AUTO_INCREMENT NOT NULL, from_user_id INT NOT NULL, to_user_id INT NOT NULL, INDEX IDX_F284D942130303A (from_user_id), INDEX IDX_F284D9429F6EE60 (to_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE friend ADD CONSTRAINT FK_55EEAC61A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D942130303A FOREIGN KEY (from_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE friend_request ADD CONSTRAINT FK_F284D9429F6EE60 FOREIGN KEY (to_user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE friend DROP FOREIGN KEY FK_55EEAC61A76ED395');
        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D942130303A');
        $this->addSql('ALTER TABLE friend_request DROP FOREIGN KEY FK_F284D9429F6EE60');
        $this->addSql('DROP TABLE friend');
        $this->addSql('DROP TABLE friend_request');
    }
}

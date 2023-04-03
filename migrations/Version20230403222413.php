<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230403222413 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE friends (user_source INT NOT NULL, user_target INT NOT NULL, INDEX IDX_21EE70693AD8644E (user_source), INDEX IDX_21EE7069233D34C1 (user_target), PRIMARY KEY(user_source, user_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE70693AD8644E FOREIGN KEY (user_source) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE friends ADD CONSTRAINT FK_21EE7069233D34C1 FOREIGN KEY (user_target) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_friend DROP FOREIGN KEY FK_30BCB75C6A5458E8');
        $this->addSql('ALTER TABLE user_friend DROP FOREIGN KEY FK_30BCB75CA76ED395');
        $this->addSql('DROP TABLE user_friend');
        $this->addSql('DROP TABLE friend');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_friend (user_id INT NOT NULL, friend_id INT NOT NULL, INDEX IDX_30BCB75C6A5458E8 (friend_id), INDEX IDX_30BCB75CA76ED395 (user_id), PRIMARY KEY(user_id, friend_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE friend (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_friend ADD CONSTRAINT FK_30BCB75C6A5458E8 FOREIGN KEY (friend_id) REFERENCES friend (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_friend ADD CONSTRAINT FK_30BCB75CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE70693AD8644E');
        $this->addSql('ALTER TABLE friends DROP FOREIGN KEY FK_21EE7069233D34C1');
        $this->addSql('DROP TABLE friends');
    }
}

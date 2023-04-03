<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230403210158 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_friend (user_id INT NOT NULL, friend_id INT NOT NULL, INDEX IDX_30BCB75CA76ED395 (user_id), INDEX IDX_30BCB75C6A5458E8 (friend_id), PRIMARY KEY(user_id, friend_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_friend ADD CONSTRAINT FK_30BCB75CA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_friend ADD CONSTRAINT FK_30BCB75C6A5458E8 FOREIGN KEY (friend_id) REFERENCES friend (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE friend DROP FOREIGN KEY FK_55EEAC61A76ED395');
        $this->addSql('DROP INDEX IDX_55EEAC61A76ED395 ON friend');
        $this->addSql('ALTER TABLE friend DROP user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_friend DROP FOREIGN KEY FK_30BCB75CA76ED395');
        $this->addSql('ALTER TABLE user_friend DROP FOREIGN KEY FK_30BCB75C6A5458E8');
        $this->addSql('DROP TABLE user_friend');
        $this->addSql('ALTER TABLE friend ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE friend ADD CONSTRAINT FK_55EEAC61A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_55EEAC61A76ED395 ON friend (user_id)');
    }
}

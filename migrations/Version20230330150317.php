<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230330150317 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE endorsement (id INT AUTO_INCREMENT NOT NULL, endorsed_user_id INT NOT NULL, endorser_user_id INT NOT NULL, game VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_1BB4EA393E8908F (endorsed_user_id), INDEX IDX_1BB4EA34C32AB74 (endorser_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE endorsement ADD CONSTRAINT FK_1BB4EA393E8908F FOREIGN KEY (endorsed_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE endorsement ADD CONSTRAINT FK_1BB4EA34C32AB74 FOREIGN KEY (endorser_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE tournament CHANGE game game VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE endorsement DROP FOREIGN KEY FK_1BB4EA393E8908F');
        $this->addSql('ALTER TABLE endorsement DROP FOREIGN KEY FK_1BB4EA34C32AB74');
        $this->addSql('DROP TABLE endorsement');
        $this->addSql('ALTER TABLE tournament CHANGE game game VARCHAR(255) DEFAULT NULL');
    }
}

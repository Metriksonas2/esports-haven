<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230427190049 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE endorsement ADD game_id INT NOT NULL, DROP game');
        $this->addSql('ALTER TABLE endorsement ADD CONSTRAINT FK_1BB4EA3E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('CREATE INDEX IDX_1BB4EA3E48FD905 ON endorsement (game_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE endorsement DROP FOREIGN KEY FK_1BB4EA3E48FD905');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP INDEX IDX_1BB4EA3E48FD905 ON endorsement');
        $this->addSql('ALTER TABLE endorsement ADD game VARCHAR(255) NOT NULL, DROP game_id');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230411165506 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tournament_match ADD next_match_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tournament_match ADD CONSTRAINT FK_BB0D551C12A4E038 FOREIGN KEY (next_match_id) REFERENCES tournament_match (id)');
        $this->addSql('CREATE INDEX IDX_BB0D551C12A4E038 ON tournament_match (next_match_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tournament_match DROP FOREIGN KEY FK_BB0D551C12A4E038');
        $this->addSql('DROP INDEX IDX_BB0D551C12A4E038 ON tournament_match');
        $this->addSql('ALTER TABLE tournament_match DROP next_match_id');
    }
}

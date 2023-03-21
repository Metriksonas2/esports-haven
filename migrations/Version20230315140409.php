<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230315140409 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE participant (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, result_text VARCHAR(255) DEFAULT NULL, INDEX IDX_D79F6B11A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tournament_match_participant (tournament_match_id INT NOT NULL, participant_id INT NOT NULL, INDEX IDX_B616DD04CA004A33 (tournament_match_id), INDEX IDX_B616DD049D1C3019 (participant_id), PRIMARY KEY(tournament_match_id, participant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B11A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE tournament_match_participant ADD CONSTRAINT FK_B616DD04CA004A33 FOREIGN KEY (tournament_match_id) REFERENCES tournament_match (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tournament_match_participant ADD CONSTRAINT FK_B616DD049D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tournament CHANGE host_id host_id INT NOT NULL');
        $this->addSql('ALTER TABLE tournament_match ADD winner_participant_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tournament_match ADD CONSTRAINT FK_BB0D551C9FBA3105 FOREIGN KEY (winner_participant_id) REFERENCES participant (id)');
        $this->addSql('CREATE INDEX IDX_BB0D551C9FBA3105 ON tournament_match (winner_participant_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tournament_match DROP FOREIGN KEY FK_BB0D551C9FBA3105');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B11A76ED395');
        $this->addSql('ALTER TABLE tournament_match_participant DROP FOREIGN KEY FK_B616DD04CA004A33');
        $this->addSql('ALTER TABLE tournament_match_participant DROP FOREIGN KEY FK_B616DD049D1C3019');
        $this->addSql('DROP TABLE participant');
        $this->addSql('DROP TABLE tournament_match_participant');
        $this->addSql('ALTER TABLE tournament CHANGE host_id host_id INT DEFAULT 1 NOT NULL');
        $this->addSql('DROP INDEX IDX_BB0D551C9FBA3105 ON tournament_match');
        $this->addSql('ALTER TABLE tournament_match DROP winner_participant_id');
    }
}

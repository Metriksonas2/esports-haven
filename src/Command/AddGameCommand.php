<?php

namespace App\Command;

use App\Entity\Game;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'add:game',
    description: 'Add a game to a database',
)]
class AddGameCommand extends Command
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;

        parent::__construct();
    }


    protected function configure(): void
    {
        $this->addArgument('game', InputArgument::REQUIRED, 'Game name to add');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $gameName = $input->getArgument('game');
        $exists = $this->entityManager->getRepository(Game::class)->findOneBy(['name' => $gameName]) !== null;

        if (!$exists) {
            $game = new Game();
            $game->setName($gameName);

            $this->entityManager->persist($game);
            $this->entityManager->flush();

            $output->writeln(sprintf('Game "%s" has been added to the database.', $gameName));

            return Command::SUCCESS;
        } else {
            $output->writeln("This game already exists in the database");

            return Command::FAILURE;
        }
    }
}

CREATE TABLE `users` (
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`thread` varchar(255) NOT NULL,
	`message` varchar(255) NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`favorite_count` int NOT NULL DEFAULT 0,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);

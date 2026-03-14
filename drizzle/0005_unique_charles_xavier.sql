ALTER TABLE `subscribers` ADD `unsubscribeToken` varchar(64);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `unsubscribed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `subscribers` ADD `unsubscribedAt` timestamp;--> statement-breakpoint
ALTER TABLE `subscribers` ADD CONSTRAINT `subscribers_unsubscribeToken_unique` UNIQUE(`unsubscribeToken`);
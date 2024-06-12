-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Июн 12 2024 г., 14:18
-- Версия сервера: 10.11.6-MariaDB-1:10.11.6+maria~ubu2004
-- Версия PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `322-20_AgroScout`
--

-- --------------------------------------------------------

--
-- Структура таблицы `basket`
--

CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `product` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `title`, `text`, `img`, `created_at`) VALUES
(16, 'Преобразование традиционных методов: дроны улучшают химическую обработку полей', 'Современные агро-инновации неуклонно движутся вперед, и дроны становятся незаменимым инструментом для сельскохозяйственных предприятий. Опрыскивание с дронов теперь осуществляется в двух форматах: \"классическом авиационном\", где химикаты равномерно распыляются по всему полю, и \"точечном\", который сочетает в себе предварительный осмотр посевов с помощью мультиспектральных камер и точную обработку только нужных участков. Это позволяет снизить расходы на химикаты, увеличить урожайность и минимизировать воздействие на окружающую среду.', 'imgNews_1.png', '2024-05-29 21:00:00'),
(17, 'Революция в сельском хозяйстве: Дроны — Новое Поколение Агротехнологий', 'Сельское хозяйство вступило в эру инноваций с появлением сельскохозяйственных дронов, которые обещают перевернуть привычные методы ведения земледелия. Новейшие модели дронов оснащены передовыми технологиями, позволяющими точно дозировать удобрения и пестициды, оптимизировать полив, а также контролировать состояние посевов из воздуха. Эффективность и точность этих автономных аппаратов позволяют сократить расходы на обработку полей и повысить урожайность. Научно-исследовательские лаборатории в настоящее время активно работают над усовершенствованием функционала дронов, делая их ещё более адаптированными к конкретным потребностям сельскохозяйственных предприятий. Эта технологическая революция привлекает внимание не только фермеров, но и инвесторов, вкладывающих средства в развитие сельскохозяйственного дрон-сектора. В ближайшем будущем можно ожидать дальнейшего расширения применения дронов в сельском хозяйстве, что открывает новые перспективы для сельскохозяйственной отрасли.', 'imgNews_4.png', '2024-06-12 21:00:00'),
(18, 'Дроны на страже экологии: Сельское Хозяйство в Гармонии с Природой', 'Сельскохозяйственные дроны не только улучшают производственные процессы, но и способствуют охране окружающей среды. Новейшие модели дронов оснащены датчиками, которые могут анализировать состояние почвы и водных ресурсов, а также обнаруживать патологии и загрязнения. Это позволяет фермерам принимать меры по сохранению и улучшению качества почвы и водных ресурсов, минимизируя негативное воздействие сельского хозяйства на окружающую среду. Благодаря интеграции дронов в сельскохозяйственные процессы, фермеры могут точно контролировать расходы на удобрения и химикаты, что снижает риск загрязнения почвы и водоемов. Экологически ориентированные аспекты использования дронов в сельском хозяйстве привлекают внимание экологических организаций и государственных учреждений, что способствует развитию и применению более экологически устойчивых методов ведения сельского хозяйства.', 'imgNews_2.png', '2024-06-13 21:00:00'),
(19, 'Цифровая трансформация поля: Дроны меняют лицо аграрного бизнеса', 'Сельскохозяйственные дроны становятся неотъемлемой частью цифровой трансформации в сельском хозяйстве, перерисовывая картину аграрного бизнеса. Использование дронов для мониторинга полей, обработки почвы и распределения ресурсов позволяет сельскохозяйственным предприятиям повысить эффективность производства и снизить затраты. Комбинирование данных, собранных с дронов, с технологиями искусственного интеллекта и аналитическими инструментами, позволяет фермерам принимать обоснованные решения на основе точной информации о состоянии полей и растений. Это открывает новые возможности для оптимизации агротехнологий и управления ресурсами, делая сельское хозяйство более устойчивым и прибыльным в долгосрочной перспективе.', 'imgNews_3.png', '2024-06-15 21:00:00'),
(20, 'Сельское хозяйство в небесах: Беспилотники преображают агро-промышленность', 'Эра беспилотных аппаратов пришла в сельское хозяйство, обещая революционные изменения в агропромышленности. Сельскохозяйственные дроны не только автоматизируют процессы обработки почвы и ухода за растениями, но и улучшают мониторинг урожаев и предотвращают потери. Благодаря возможности сканирования больших участков земли и анализа данных в реальном времени, дроны позволяют фермерам быстро реагировать на изменения в росте и здоровье растений, повышая качество и количество урожая. Это открывает новые горизонты для сельскохозяйственного производства, делая его более эффективным, экологически чистым и конкурентоспособным на мировом рынке.', 'imgNews_1.png', '2024-06-06 21:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `order`
--

INSERT INTO `order` (`id`, `createdAt`, `user`) VALUES
(66, 1717949764, 34),
(67, 1718105576, 34);

-- --------------------------------------------------------

--
-- Структура таблицы `order_product`
--

CREATE TABLE `order_product` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `order_product`
--

INSERT INTO `order_product` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(67, 66, 19, 1),
(68, 67, 12, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`image`)),
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `category` varchar(120) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product`
--

INSERT INTO `product` (`id`, `name`, `image`, `brand`, `model`, `category`, `price`, `description`, `count`) VALUES
(12, 'AGR A22', '[\"AGR A22.png\", \"AGR A22-2.png\", \"AGR A22-3.png\", \"AGR A22-desc.png\"]', 'AGR', '101-110-102', 'БПЛА Самолетного типа', 800000.00, 'A22RTK продолжает превосходство классической конструкции сельскохозяйственного беспилотника AGR. Имеет литой корпус и цельнолитое литье, что увеличивает максимальную нагрузку дрона до 22 кг. Недавно разработанное Т-образное сопло выводит эффективность работы на новый уровень; Интеллектуальная система управления полетом AG3Pro предназначена для точного и эффективного продвижения технологической модернизации и инноваций в развитии сельскохозяйственной отрасли', 1),
(13, 'EFT-Z50', '[\"EFT-Z50.webp\", \"EFT-Z50-2.webp\", \"EFT-Z50-3.webp\", \"EFT-Z50-desc.gif\"]', 'EFT', '114-534-22', 'БПЛА Самолетного типа', 900000.00, 'Наслаждайтесь интеллектуальным и плавным управлением с помощью беспилотных летательных аппаратов серии Z для сельского хозяйства. две модели с нагрузкой 30 кг и 50 кг, с недавно модернизированной высокопрочной ферменной конструкцией, беспроводным интегрированным управлением полетом, лопастными насосами с большим расходом и центробежными форсунками с водяным охлаждением. Агродрон EFT Z50 отличается глубокой интеграцией программного и аппаратного обеспечения.', 19),
(15, 'TopXGun FP600', '[\"TopXGun FP600.webp\", \"TopXGun FP600-2.webp\", \"TopXGun FP600-3.webp\", \"TopXGun FP600-desc.webp\"]', 'TopXGun', '542-582-12', 'БПЛА мультироторного типа', 500000.00, 'Квадрокоптер FP600 — флагманская, наиболее производительная модель в линейке сельскохозяйственных дронов, которая отличается от предыдущих поколений серии FP повышенной производительностью и эффективностью. Аппарат ориентирован для использования на территориях большой площади.', 46),
(16, 'G630', '[\"G630.webp\", \"G630-2.webp\", \"G630-3.webp\", \"G630-desc.webp\"]', 'G', '888-436-53', 'БПЛА мультироторного типа', 700500.00, 'Агродрон G630 — это инновационное решение для современных сельскохозяйственных нужд, разработанное для повышения эффективности и точности обработки полей. Оснащённый передовыми технологиями, G630 способен выполнять широкий спектр задач, включая мониторинг состояния посевов, внесение удобрений и средств защиты растений, а также картографирование территорий.', 16),
(17, 'SIYI ZR30', '[\"SIYI ZR30.webp\", \"SIYI ZR30-2.webp\", \"SIYI ZR30-3.webp\", \"SIYI ZR30-desc.webp\"]', 'SIYI', '666-324-54', 'Дроны опрыскиватели', 120000.00, 'Камера SIYI ZR30 — это высококлассное устройство, специально разработанное для профессионального использования в области аэрофотосъёмки и видеонаблюдения. Благодаря своим передовым характеристикам и широким возможностям, SIYI ZR30 становится незаменимым инструментом для множества задач, требующих высокоточного визуального контроля.', 5),
(18, 'EFT S50', '[\"EFT S50.webp\", \"EFT S50-2.webp\", \"EFT S50-3.webp\", \"EFT S50-desc.gif\"]', 'EFT', '035-325-18', 'Дроны для картографии', 650000.00, 'Дрон сельскохозяйственный EFT S50 — это передовое решение для современных агротехнологий, созданное для повышения эффективности и оптимизации всех этапов сельскохозяйственных работ. Оснащённый передовыми технологиями, EFT S50 предоставляет аграриям мощные инструменты для мониторинга, анализа и обработки полей, что позволяет значительно увеличить урожайность и снизить затраты.', 64),
(19, 'XAG P100', '[\"XAG P100.png\", \"XAG P100-2.png\", \"XAG P100-3.png\", \"XAG P100-desc.png\"]', 'XAG', '678-256-13', 'Полезные нагрузки', 600000.00, 'Сельскохозяйственный дрон XAG P100 — это высокотехнологичное устройство, разработанное для оптимизации и повышения эффективности сельскохозяйственных процессов. Благодаря своим передовым функциям и надежной конструкции, XAG P100 становится незаменимым инструментом для современных аграриев, стремящихся к автоматизации и улучшению качества своей работы.', 62),
(20, 'DJI Agras T20', '[\"DJI Agras T20.png\", \"DJI Agras T20-2.png\", \"DJI Agras T20-3.png\", \"DJI Agras T20-desc.png\"]', 'DJI', 'T20', 'БПЛА Самолетного типа', 1200000.00, 'Agras T20 - это самый продвинутый агрономический беспилотник от DJI. Он оснащен передовыми функциями и способен выполнять широкий спектр сельскохозяйственных задач!', 15),
(21, 'Yuneec H520', '[\"Yuneec H520.png\", \"Yuneec H520-2.png\", \"Yuneec H520-3.png\", \"Yuneec H520-desc.png\"]', 'Yuneec', 'H520', 'БПЛА мультироторного типа', 950000.00, 'Yuneec H520 - это многофункциональный мультироторный беспилотник, который предназначен для использования в различных областях, включая сельское хозяйство, пожаротушение и...', 55),
(30, 'test', '[{\"name\":\"ad2.jpg\",\"tempName\":\"\\/home\\/322-20\\/tmp\\/phpRFZO7Z\",\"type\":\"image\\/jpeg\",\"size\":41129,\"error\":0,\"fullPath\":\"ad2.jpg\"},{\"name\":\"ad.jpg\",\"tempName\":\"\\/home\\/322-20\\/tmp\\/php66u8HV\",\"type\":\"image\\/jpeg\",\"size\":203892,\"error\":0,\"fullPath\":\"ad.jpg\"}]', 'ABOBA', '124-234-54-54', 'НЫФВАФф', 22837.00, 'dsfasdf', 22),
(31, 'AGR A22', '[\"AGR A22.png\",\"AGR A22-2.png\",\"AGR A22-3.png\",\"AGR A22-desc.jpg\"]', 'AGR', '101-110-102', 'БПЛА Самолетного типа', 800000.00, 'A22RTK продолжает превосходство классической конструкции сельскохозяйственного беспилотника AGR. Имеет литой корпус и цельнолитое литье, что увеличивает максимальную нагрузку дрона до 22 кг. Недавно разработанное Т-образное сопло выводит эффективность работы на новый уровень; Интеллектуальная система управления полетом AG3Pro предназначена для точного и эффективного продвижения технологической модернизации и инноваций в развитии сельскохозяйственной отрасли', 23);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `address` varchar(320) NOT NULL,
  `password` varchar(120) NOT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `email`, `phone`, `address`, `password`, `admin`) VALUES
(34, 'Gvyganovsky', 'gvyganovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 423', '$2y$13$b6pIA6ypQhcNTKsLBVPphurPNeU3T8HEdnu0a37h84fQyoyQJGtKq', 1),
(36, 'asdasd', 'adas2321sdadsd@mail.ru', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$NQiEcQm8dSmchUco5P8CNOl.MccEHmVnwIGsncsGTOuVN0qTWxOI6', 0),
(37, 'asdasd', 'gvasdadsyganovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$bSd0fS04EqCGsHO7.o9UpuPzfiToeNw0nEaAQfFuzVex5f9JFTjS.', 1),
(38, 'Gvyganovsky', 'gvysadasganovsky@gmail.com', '+7(953)-362-60-91', 'г. ЫВАВЫ, ул. ЫВФЫВ. д. 23', '$2y$13$28osTXPgnv3v6kD5w5s1pOUSRYoOKe1YZOKI3MLeO.jb.Qkz.y2ai', 0),
(39, 'Gleb', 'xleb.panzar@mail.ru', '+7(904)-556-43-63', 'г. Москва, ул. Красная, д 12', '$2y$13$wprepEkaSUwvF1HGdl6Lp.I2763QjMj/lpgGA39UKbbzjRomx/qEe', 0),
(40, 'Gleb', 'xleb.panzarDd@mail.ru', '+7(904)-556-43-63', 'г. Москва, ул. Красная, д 12', '$2y$13$/hV4myI0IN1CYGH8gC4oa.IxMM.nQOOmciRu9farUXJiL4xymSIK6', 0),
(41, 'asdasd', 'gvyadsfganovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$yPmRdnh4s615Z1twdrQDUOZ79Ht2vtqtebuMwruKVxAgNpkhoOj5u', 0),
(42, 'asdafsd', 'asdsdafsd@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$KDA7sVw/28DvyTBoLEPTPe8nconnsvW7CXLDBO8JsA0nJ0kPe9Rry', 0),
(43, 'asdasd', 'gvyafasfganovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$/XiNY9WDIB6Ob9q1kCqSH.kP90F9UHQkLT82V2gw5lhYhwWMIXfba', 0),
(44, 'asdasdasd', 'asdfgvygasdfanovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$JSxEXkBvb5qzo4761U5M9uben8VNppQwazhrZgKGoEpuWXyQ6Dvce', 0),
(45, 'asdfsadasfddsfa', 'gvygafghfghnodsfvsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$guGd6xkgmPEt0qxAHqBBAOpvEhXSMgY4fZ9ZVjRlHkC6GhtK2D30O', 0),
(46, 'asdasd', 'gvygsadggsdagdanovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$ka25XQbNaLq5gOAbAI94c.75vdSbrwFlva0M7HXUfw7Cr90vQjx2e', 0),
(47, 'asdasd', 'gasdfvyganovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$3f.tHCqsG2YkfGQ6XV2F.u6lq4FiyTJd08F9tsKo664fvP2sw6NOm', 0),
(48, 'asdasd', 'gvyganodsfsadfvsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$Fu7pvgLSUbYR1Srxp5Xcfepm4CSqPhJkdtQtShldJk.leJASaYx8a', 0),
(49, 'Gleb', 'xleb.paasdnzarDd@mail.ru', '+7(904)-556-43-63', 'г. Москва, ул. Красная, д 12', '$2y$13$gKIy1.zQ8DH1N8YuKUgGbOtN5dCckEOoVeTLR.H7rHfYrvaHm9GJ6', 0),
(51, 'Anton', 'gvyganovsafdsgfdgky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$PbgzKWmC1c0YMy62bnxOSOB.uM83SuqQsZz80r0LV6YBopc.eBhB.', 0),
(54, 'dfssdaffdsa', 'gvyganagfdfdgovsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$uQ7mqqmH8cEI9aIutlje..7/YKi2j8nQC8AMmA3O.t2cNLsP.hmGW', 0),
(55, 'asdasd', 'gvyganovdfsgsky@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$mK316L1KS1Q6atcmbaye0uVL/LEOGKcyu6i7lDz3JWsOFBaNqTCpq', 0),
(56, 'lllll', 'llll@gmail.com', '+7(953)-124-45-22', 'г. ыфвфв, ул. выфы, д. 122', '$2y$13$m06/KZFXpVPSsN7rFzjZO.nvipifhJi/17I74ohvN2joGutFTvrTq', 0),
(57, 'dddd', 'ddddd@gmail.com', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$8QuNA2kqmn3UVLOc.88WkeuIKbZt15El86eFusEgGcF8p0tZduqK6', 0),
(58, 'asdasdasdf', 'asdasdfas@asd.ru', '+7(953)-124-45-22', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$Go5Wb44Uru7cgrxSm03CieyeRjhGI2Z2YkIVJKyQfDdr.8kEBUusu', 0),
(59, 'asdasd', 'gvygaasdfsnovsky@gmail.com', '+7(953)-124-45-22', 'г. ыфвфв, ул. выфы, д. 222', '$2y$13$y5nocqu6LkyCA/lEZob8rOEi5hpSXxaBF8bTwxJJjMAlg3nEpDmjO', 0),
(60, 'Gvyganovsky', 'gv@asd.ru', '+7(124)-124-34-65', 'г. Москва, ул. Красная, д. 12', '$2y$13$3anPRiS6.4kfsnKBJk6BveH.SHioRSuXE1JkbDU1C296cgqyAuy0e', 0),
(61, 'asdfdsaf', 'asfdasdff@sadads.ru', '+7(953)-124-45-23', 'г. ыфвфв, ул. выфы, д. 123', '$2y$13$m2ERHJhDsyuTJyWGd.Ciy.01i8B43NLKSSX.7uauhsyVHr295mAOa', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `product` (`product`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Индексы таблицы `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT для таблицы `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT для таблицы `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`product`) REFERENCES `product` (`id`);

--
-- Ограничения внешнего ключа таблицы `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

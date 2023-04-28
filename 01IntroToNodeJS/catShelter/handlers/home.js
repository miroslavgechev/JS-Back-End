module.exports = (cats, searchTerm = '') => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/site.css">
    <link rel="shortcut icon" type="image/x-icon" href="/content/images/pawprint.ico" />
    <title>Cat Shelter</title>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
        <form method="GET">
            <input name="search" type="text" value="${searchTerm}">
            <button type="submit">Search</button>
        </form>
    </header>

    <main>
        <section class="cats">
            <ul>
                ${cats.map(cat =>
    `
                    <li>
                    <img src=${cat.imageUrl} alt="Black Cat">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/cats/${cat.id}/edit">Change Info</a></li>
                        <li class="btn delete"><a href="/cats/${cat.id}/shelter">New Home</a></li>
                    </ul>
                </li>
                    `
                ).join('')}
                
            </ul>
        </section>
    </main>

</body>

</html>

`
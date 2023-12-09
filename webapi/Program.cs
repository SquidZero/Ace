using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.WriteIndented = true;
    options.SerializerOptions.IncludeFields = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

string[,] deckContents = new string[,]
{
    { "monopoly", "when one company controls an entire industry" },
    { "robber barons", "people who got their wealth from shady business practices" },
    { "Industrialization", "the switch from products being from manual labor (hand made) to products being made by machines"},
};

Deck? UserDeck = null;

app.MapGet("/get_deck", () =>
{
    var givenDeck = Enumerable.Range(0, deckContents.GetLength(0)).Select(i =>
        new Card(deckContents[i, 0], deckContents[i, 1])).ToArray();
    if (UserDeck != null)
    {
        Console.WriteLine("User deck name: " + UserDeck.Name);
        Console.WriteLine("User deck subject: " + UserDeck.Subject);
        Console.WriteLine("User deck cards: " + UserDeck.cards);
        return [.. UserDeck.cards];
    }
    else
    {
        return givenDeck;
    }
})
.WithName("GetDeck")
.WithDisplayName("Get Deck")
.WithOpenApi();

app.MapPost("/new/submit", (HttpRequest request) =>
{
    string name;
    int subject = -1;

    name = request.Form["name"].ToString() ?? "deck";
    int.TryParse(request.Form["subject"], out subject);

    if (subject == -1)
    {
        Console.Error.WriteLine("invalid form field: 'subject'");
        return Results.Content("<h1>form submission error, please submit the form again</h1>", "text/html");
    }
    else
    {
        UserDeck = new Deck(name, subject);
        return Results.Content("<h1>" + name + "</h1>", "text/html"); // XSS!!!
    }
})
.WithName("SubmitNewDeck")
.WithOpenApi();

app.MapPost("/edit_cards", (Card card) =>
{
    if (card.Definition is not null && card.Term is not null && UserDeck != null)
    {
        UserDeck.cards.Add(card);
        return Results.Ok(card);
    }
    else
    {
        return Results.BadRequest();
    }
})
.WithName("EditCards")
.WithDisplayName("Edit Cards")
.Accepts<Ok>("application/json")
.WithOpenApi();

app.Run();

record Deck(string Name, int Subject)
{
    public List<Card> cards = [];
}
record Card(string Term, string Definition) { }

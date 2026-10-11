Title: Forms and buttons
Slug: forms-and-buttons
Sortorder: 31
Section: Components

This form doesn't submit anywhere.

<form onsubmit="return false">
    <fieldset>
        <legend>Your details</legend>
        <label for="demo-name">Name</label>
        <input type="text" id="demo-name" placeholder="Ada Lovelace" />
        <label for="demo-email">Email</label>
        <input type="email" id="demo-email" placeholder="ada@example.com" />
        <label for="demo-age">Age</label>
        <input type="number" id="demo-age" value="36" />
        <label for="demo-role">Role</label>
        <select id="demo-role">
            <option>Member</option>
            <option>Moderator</option>
            <option>Administrator</option>
        </select>
        <label for="demo-notes">Notes</label>
        <textarea id="demo-notes" placeholder="Anything else?"></textarea>
    </fieldset>
    <fieldset>
        <legend>Pick one</legend>
        <label><input type="radio" name="demo-choice" checked /> Option A</label>
        <label><input type="radio" name="demo-choice" /> Option B</label>
    </fieldset>
    <fieldset>
        <legend>Pick any</legend>
        <label><input type="checkbox" checked /> Checkbox one</label>
        <label><input type="checkbox" /> Checkbox two</label>
    </fieldset>
    <button class="btn" type="submit">Submit</button>
    <button class="btn" type="button" disabled>Disabled button</button>
</form>

## Link buttons

<div><a class="btn-link" href="#"><div class="btn">A link styled as a button</div></a></div>

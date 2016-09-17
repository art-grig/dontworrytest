function NewsFeed(data)
{
    this.ID = 0;
    this.Date = new Date();
    this.Title = '';
    this.Text = '';
    this.Image = null;

    if (data)
    {
        this.ID = data.ID;
        this.Date = new Date(data.Date);
        this.Title = data.Title;
        this.Text = data.Text;
    }
}
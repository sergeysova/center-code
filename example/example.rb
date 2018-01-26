# This is the circle that wanders around the canvas.
class MovingCircle < TkcOval
  # Create with a moving circle on the canvas c with indicated color.
  def initialize(c, color)
    # Remember the canvas.
    @canv = c

    # Choose an initial location at random and create the object there.
    @xpos = rand(Width - Diameter)
    @ypos = rand(Height - Diameter)
    super(c, @xpos, @ypos, @xpos + Diameter, @ypos + Diameter, 'fill' => color)

    # Chose a velocity at random.  1 to 3 pixels per Frequency in each
    # dimension.
    @delx = (rand(3)+1)*(if rand(2) == 1 then 1 else -1 end)
    @dely = (rand(3)+1)*(if rand(2) == 1 then 1 else -1 end)

    # Start moving
    Tk.after(Frequency, proc { self.move } )
  end
end

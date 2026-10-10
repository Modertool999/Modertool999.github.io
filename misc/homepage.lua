-- Put the introductory Markdown in a panel and style the portrait.
-- Used only by pages/index.qmd; writing the page needs no layout markup.
-- The homepage portrait is a photo, rather than a captioned figure.
function Figure(figure)
  return figure.content
end

function Pandoc(doc)
  local intro = pandoc.List()
  local rest = pandoc.List()
  local in_intro = true

  for _, block in ipairs(doc.blocks) do
    local has_image = false
    block = block:walk({
      Image = function(image)
        has_image = true
        image.classes:insert("homepage-photo")
        -- A span keeps the portrait inline, without an automatic caption.
        return pandoc.Span({image})
      end
    })
    if has_image or block.t ~= "Para" then
      in_intro = false
    end
    if in_intro then
      intro:insert(block)
    else
      rest:insert(block)
    end
  end

  if #intro > 0 then
    rest:insert(1, pandoc.Div(intro, pandoc.Attr("", {"home-cover"})))
  end
  return pandoc.Pandoc(rest, doc.meta)
end

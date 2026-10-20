@echo off
REM Read the first .cat-third-card href from the page
powershell -Command "$content = Invoke-WebRequest -Uri 'http://localhost:8080/cat.html?c=food&s=%E5%92%96%E5%95%A1' -UseBasicParsing; $matches = [regex]::Matches($content.Content, '<a class=\"cat-third-card\"([^>]*)>'); foreach ($m in $matches) { $href = [regex]::Match($m.Value, 'href=\"([^\"]+)\"'); if ($href.Success) { Write-Output $href.Groups[1].Value; break } }"

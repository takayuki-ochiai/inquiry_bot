# itamae ssh -h tech_push_st -u suidenOTI  itamae/recipes/nginx_setup.rb

package "nginx"
# システム全体でnvm経由でインストールしたnode,jsを使えるように
NGINX_CONF = "/etc/nginx/nginx.conf"
# 転送先のパスを指定
remote_file NGINX_CONF do
  # レシピファイルからの相対パス
  source "remote_files/nginx.conf"
end

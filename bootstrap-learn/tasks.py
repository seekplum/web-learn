# -*- coding: utf-8 -*-

from invoke import task


@task
def clean(ctx):
    """清除项目中无效文件
    """
    ctx.run('rm -rf build dist', echo=True)
    ctx.run("find . -name '*.pyc' -exec rm -f {} +", echo=True)
    ctx.run("find . -name '*.pyo' -exec rm -f {} +", echo=True)
    ctx.run("find . -name '__pycache__' -exec rm -rf {} +", echo=True)
    ctx.run("find . -name 'htmlcov' -exec rm -rf {} +", echo=True)
    ctx.run("find . -name '.coverage*' -exec rm -rf {} +", echo=True)
    ctx.run("find . -name '.pytest_cache' -exec rm -rf {} +", echo=True)
    ctx.run("find . -name '.benchmarks' -exec rm -rf {} +", echo=True)
    ctx.run("find . -name '*.egg-info' -exec rm -rf {} +", echo=True)
